import { imageUpload } from "../models/imageUpload";

export async function deleteFromDatabase(key: string): Promise<void> {
  await imageUpload.destroy({ where: { key } });
}