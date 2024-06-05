export interface Page<T>{
  content : Array<T>,
  page : number,
  size : number,
  totalElements : number,
  totalPages : number
}
