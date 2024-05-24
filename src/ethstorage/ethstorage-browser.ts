import { BaseEthStorage } from "./ethstorage";

export class EthStorage extends BaseEthStorage {
  getFileInfo(pathOrFile: any) {
    return {
      isFile: true,
      isDirectory: false,
      name: pathOrFile.name,
      size: pathOrFile.size,
      path: pathOrFile,
    };
  }

  async getFileChunk(
    file: any,
    fileSize: number,
    start: number,
    end: number
  ): Promise<Buffer> {
    end = end > fileSize ? fileSize : end;
    const slice = file.slice(start, end);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (res: any) => {
        resolve(Buffer.from(res.target.result));
      };
      reader.readAsArrayBuffer(slice);
    });
  }
}
