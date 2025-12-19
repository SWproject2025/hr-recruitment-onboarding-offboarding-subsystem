import { DocumentType } from '../enums/document-type.enum';

export class CreateDocumentDto {
  ownerId: string;
  type: DocumentType;
  filePath: string;
}