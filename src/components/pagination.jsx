import {  createEffect, createMemo, createSignal, For } from "solid-js";

const Pagination = (props) => {
  const [startPage,setStartPage] = createSignal(1);
  const [endPage,setEndPage] = createSignal(2);
  const [totalPages,setTotalPages] =createSignal(0);
  //console.log("totalItems: ", props.totalItems);

  //console.log("totalItems",totalItems);
  //const total = Math.ceil(totalItems / itemsPerPage);
  //const totalPages = 10
  
  createMemo(() => {
  
  const total = Math.ceil(props.totalItems / props.itemsPerPage);
  const start = props.currentPage > 1 ? props.currentPage - 1 : 1;
  const end = start + 2 <= total ? start + 2 : total;
  setStartPage(start);
  setEndPage(end);
  setTotalPages(total);
  // console.log("totalItems: ", props.totalItems);
  // console.log("itemsPerPage: ", props.itemsPerPage);
  // console.log("currentPage: ", props.currentPage);

})


  const changePage = (page) => {
    if (page < 1 || page > totalPages()) return;
   props.onPageChange(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" onClick={() => changePage(props.currentPage  - 1)}>
            Previous
          </a>
        </li>
        
        <For each={Array.from({ length: endPage() - startPage() + 1 }, (_, i) => startPage() + i)}>
          {(page) => (
            <li class={`page-item ${props.currentPage === page ? 'active' : ''}`}>
              <a class="page-link" href="#" onClick={() => changePage(page)}>
                {page}
              </a>
            </li>
          )}
        </For>
        <li class="page-item">
          <a class="page-link" href="#" onClick={() => changePage(props.currentPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;