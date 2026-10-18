import { useRef, type ChangeEvent } from "react";
import { FileUp } from "lucide-react";
import { formatFileSize } from "@/shared/utils";
import { MATERIAL_FILE_ACCEPT } from "../constants";

interface MaterialFileFieldProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string | null;
  disabled?: boolean;
  label?: string;
}

export function MaterialFileField({
  file,
  onChange,
  error,
  disabled,
  label = "File",
}: MaterialFileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = "material-file-error";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-foreground">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={MATERIAL_FILE_ACCEPT}
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
        aria-describedby={error ? errorId : undefined}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="flex min-h-24 w-full items-center gap-3 rounded-md border border-dashed border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-accent-subtle/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary">
          <FileUp className="size-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">
            {file?.name ?? "Choose a file"}
          </span>
          <span className="block text-sm text-muted-foreground">
            {file
              ? formatFileSize(file.size)
              : "PDF, Office document, spreadsheet, presentation, PNG or JPG · 25 MB max"}
          </span>
        </span>
      </button>
      <p id={errorId} className="min-h-5 text-sm text-destructive">
        {error ?? ""}
      </p>
    </div>
  );
}
