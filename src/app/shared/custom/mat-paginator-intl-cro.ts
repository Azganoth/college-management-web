import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Itens por pagina:';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  getRangeLabel =
    (page, pageSize, length) => `${page * pageSize + 1} - ${(page + 1) * pageSize} de ${length}`
}
