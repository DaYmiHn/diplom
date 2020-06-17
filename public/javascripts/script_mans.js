var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 160,
  gutter: 5
});

$grid.on( 'click', '.grid-item', function() {
  // change size of item via class
  $(this).addClass('grid-item--gigante');
  $(this).find('.grid-content').fadeIn();
  $(this).find('.close').fadeIn();
  $(this).find('img').addClass('img-content');
  
  // trigger layout
  $grid.masonry();
});

$grid.on( 'click', '.close', function() {
  // change size of item via class
  $(this).parent().find('.close').hide();
  $(this).parent().find('.grid-content').hide();
  $(this).parent().removeClass('grid-item--gigante');
  $(this).parent().find('img').removeClass('img-content');
  // trigger layout
  $grid.masonry();
  return false;
});


$grid.on( 'layoutComplete', function( event, laidOutItems ) {
  console.log( 'Masonry layout complete with ' + laidOutItems.length + ' items' );
});