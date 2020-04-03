import { defer } from "./defer";

export async function download(fileName: string, data: BlobPart | object) {
  const content =
    typeof data === "string" || data instanceof Blob
      ? data
      : JSON.stringify(data);
  const downloadURL = window.URL.createObjectURL(
    new Blob([content], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.download = fileName;
  anchor.href = downloadURL;
  await defer(() => anchor.dispatchEvent(new MouseEvent("click")));
}
