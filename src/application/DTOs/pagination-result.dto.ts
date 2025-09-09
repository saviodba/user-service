type Input = {
  page: number
  itemsPerPage: number
  totalItems: number
  itemsList: Array<any>
}





export class PaginationResultDTO<T> {
  static create(data: Input) {
      const totalPages = Math.ceil(data.totalItems / data.itemsPerPage)

      const pagination = {
          currentPage: Number(data.page),
          totalPages: totalPages,
          totalItems: data.totalItems,
          itemsPerPage: data.itemsPerPage,
      }

      return {
        pagination,
        items: data.itemsList,          
      }
  }
}
