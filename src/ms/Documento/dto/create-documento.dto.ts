// src/ms/Documento/dto/create-documento.dto.ts
export class CreateDocumentoDto {
  estudianteId: number;
  tipoDocumento: string;
  nombreArchivo: string;
  rutaArchivo: string;
  estadoValidacion?: string;
  comentarios?: string;
}