import { PaginationQuery } from "src/interfaces/pagination-quey";

class Pagination {
    static getPaginationParams(quey:PaginationQuery): { skip: number; limit: number } {
      const { pagesize, page } = quey;
      const skip = +pagesize && +page ? (+page - 1) * +pagesize : 0;
      const limit = +pagesize || undefined;
      return { skip, limit };
    }
}

export default Pagination;