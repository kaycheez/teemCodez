$(document).ready(function() {
  // attach event listener to buttons(input)
  $('.store-btn').on('click', function() {
    let titleValue = $('.input-field-title').val();
    let contentValue = $('.input-field-body').val();

    localStorage.setItem('titleValue', titleValue);
    localStorage.setItem('contentValue', contentValue);
  })
  $('.get-btn').on('click', function() {

    let titleValue = localStorage.getItem('titleValue');
    let contentValue = localStorage.getItem('contentValue');

    $('.debug').html(`<p>${titleValue} ${contentValue}</p>`)

    // console.log(localStorage.getItem('hrext'));
  })
  $('.delete-btn').on('click', function() {

    console.log(localStorage.removeItem('hrext'));
  })
  // create function stub for read/write/delete
});