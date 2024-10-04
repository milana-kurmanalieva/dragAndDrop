import classes from "./Advertisements.module.scss";
import { Container } from "../Container/Container";
import { DragItems } from "../DragItems/DragItems";
import { useState } from "react";
import { DragAndDropMobile } from "../DragAndDropMobile/DragAndDropMobile";
import { useMediaQuery } from "../../hooks/useMediaQuery";
// import { Drag } from "../Drag";

export interface Files {
  id: string;
  file: File | null;
}

export interface Props {
  largeFile: Files[];
  setLargeFile: (files: Files[]) => void;
  draggedIndex: number | null;
  setDraggedIndex: (index: number | null) => void;
  sortFiles: (files: Files[]) => Files[];
  addFiles: (photos: File[]) => void;
  deletePhoto: (id: string) => void;
}

export const Advertisements = () => {
  const [largeFile, setLargeFile] = useState<Files[]>([
    { id: "1", file: null },
    { id: "2", file: null },
    { id: "3", file: null },
    { id: "4", file: null },
    { id: "5", file: null },
    { id: "6", file: null },
    { id: "7", file: null },
    { id: "8", file: null },
    { id: "9", file: null },
  ]);
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const sortFiles = (files: Files[]) => {
    return files
      .filter((item) => item.file !== null)
      .concat(files.filter((item) => item.file === null));
  };

  const addFiles = (photos: File[]) => {
    const files = [...largeFile];
    photos.forEach((photo) => {
      const index = files.findIndex((item) => item.file === null);
      if (index !== -1) {
        files[index] = { ...files[index], file: photo };
      }
    });

    setLargeFile(sortFiles(files));
  };

  const deletePhoto = (id: string) => {
    const updatedFiles = largeFile.map((item) =>
      item.id === id ? { ...item, file: null } : item
    );
    setLargeFile(sortFiles(updatedFiles));
  };

  return (
    <div className={classes.advertisements}>
      <Container>
        <div className={classes.advertisementsContainer}>
          {isTablet ? (
            <DragAndDropMobile
              sortFiles={sortFiles}
              addFiles={addFiles}
              largeFile={largeFile}
              setLargeFile={setLargeFile}
              deletePhoto={deletePhoto}
            />
          ) : (
            <DragItems
              largeFile={largeFile}
              setLargeFile={setLargeFile}
              draggedIndex={draggedIndex}
              setDraggedIndex={setDraggedIndex}
              sortFiles={sortFiles}
              addFiles={addFiles}
              deletePhoto={deletePhoto}
            />
          )}
        </div>
      </Container>
      {/* <Drag /> */}
    </div>
  );
};
