import { useEffect, useState } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebaseConfig';

function useUploadFiles(file: File | null) {
  const [url, setUrl] = useState<string>('');
  const [loadingPercent, setLoadingPercent] = useState<number | null>(null);

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) return;

      const fileName = `${new Date().getTime()}%${Math.random() * 100}%${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoadingPercent(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return { url, loadingPercent };
}

export default useUploadFiles;
