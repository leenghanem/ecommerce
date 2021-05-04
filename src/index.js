
// import '@laylazi/bootstrap-rtl-scss/dist/css/bootstrap-rtl.min.css';
import './scss/style.scss';
import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery/dist/jquery.slim.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';


$(function() {

  $('[data-toggle="tooltip"]').tooltip();

  $('.add-to-cart-btn').on( "click",function() {
      alert('Add product to buying cart');
  });

    
  $('.product-option input[type="radio"]').on( "change",function() {
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });

  $('[data-remove-from-cart]').on( "click",function() { 
      $(this).parents('[data-product-info]').remove();

      calculateTotalPrice();
  });

  $('[data-product-quantity]').on( "change",function() {

      var newQuantity = $(this).val();

      var $parent = $(this).parents('[data-product-info]');

      var pricePerUnit = $parent.attr('data-product-price');

      var totalPriceForProduct = newQuantity * pricePerUnit;

      $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

      calculateTotalPrice();
  });

  function calculateTotalPrice() {

    var totalPriceForAllProducts = 0;

    $('[data-product-info]').each(function() {

        var pricePerUnit = $(this).attr('data-product-price');

        var quantity = $(this).find('[data-product-quantity]').val();

        var totalPriceForProduct = pricePerUnit * quantity;
        totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
    });

    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
  }

  var citiesByCountry = {
      sa: ['Riyad','Jaddah'],
      eg: ['Cario','Iskindaria'],
      jo: ['Amman','AL zarka'],
      sy: ['Dimascus','Halb','Hammah']
  };

  $('#form-checkout select[name="country"]').on( "change",function() {
    var country = $(this).val();

    var cities = citiesByCountry[country];

    $('#form-checkout select[name="city"]').empty();
    $('#form-checkout select[name="city"]').append(
        '<option disabled selected value="">Choose City</option>'
    );

    cities.forEach(function(city) {
      var newOption = $('<option></option>');
      newOption.text(city);
      newOption.val(city);
      $('#form-checkout select[name="city"]').append(newOption);
    });
  });

  $('#form-checkout input[name="payment_method"]').on( "change",function() {
    var paymentMethod = $(this).val();

    if (paymentMethod === 'on_delivery') {
      $('#credit-card-info input').prop('disabled', true);

    } else {
      $('#credit-card-info input').prop('disabled', false);
    }
  
    $('#credit-card-info').toggle();
  });
 
  $( "#price-range" ).slider({
    range: true,
    min: 50,
    max: 1000,
    step: 50,
    values: [ 250, 800 ],
    slide: function( event, ui ) {
      $('#price-min').text(ui.values[0]);
      $('#price-max').text(ui.values[1]);
    }
  });
  
});




