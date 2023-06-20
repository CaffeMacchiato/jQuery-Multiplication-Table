/* Here, I am wrapping everything inside of (document).ready(...) */
$(document).ready(function() {
    // Form validation rules
    $('#boundsForm').validate({
      rules: {
        /* Here, I am breaking down each of my bounds within boundsForm */
        clbound: {
          required: true,
          number: true
        },
        cubound: {
          required: true,
          number: true
        },
        rlbound: {
          required: true,
          number: true
        },
        rubound: {
          required: true,
          number: true
        }
      },
      messages: {
        clbound: {
          required: "Column Lower Bound is required.",
          number: "Please enter a valid number."
        },
        cubound: {
          required: "Column Upper Bound is required.",
          number: "Please enter a valid number."
        },
        rlbound: {
          required: "Row Lower Bound is required.",
          number: "Please enter a valid number."
        },
        rubound: {
          required: "Row Upper Bound is required.",
          number: "Please enter a valid number."
        }
      },
  
      submitHandler: function(form) {
        // Clear previous error messages and table
        $('#isEmptyError, #validationError, #lowerBoundError, #multiTable').empty();
  
        // Get the form field values
        var clbound = Math.floor(parseFloat($('#clbound').val()));
        var cubound = Math.floor(parseFloat($('#cubound').val()));
        var rlbound = Math.floor(parseFloat($('#rlbound').val()));
        var rubound = Math.floor(parseFloat($('#rubound').val()));
  
        // Check if any field is empty or not a number
        if (isNaN(clbound) || isNaN(cubound) || isNaN(rlbound) || isNaN(rubound)) {
          $('#isEmptyError').text("Please fill out all the fields correctly.");
          return;
        }
  
        // Check if lower bounds are larger than upper bounds
        if (clbound > cubound || rlbound > rubound) {
          $('#lowerBoundError').text("Lower bounds should be smaller than or equal to upper bounds.");
          return;
        }
  
        // Check if values are within the range 1 to 50
        if (clbound < 1 || clbound > 50 || cubound < 1 || cubound > 50 || rlbound < 1 || rlbound > 50 || rubound < 1 || rubound > 50) {
          $('#validationError').text("Bounds should be between 1 and 50.");
          return;
        }
  
        // Calculate the number of rows and columns
        var numRows = rubound - rlbound + 2;
        var numCols = cubound - clbound + 2;
  
        // Create the multiplication table
        var table = $('<table>');
        for (var i = 0; i < numRows; i++) {
          var row = $('<tr>');
          for (var j = 0; j < numCols; j++) {
            var cell = $('<td>');
            if (i === 0 && j === 0) {
              cell.text('X');
            } else if (i === 0) {
              cell.text(clbound + j - 1);
            } else if (j === 0) {
              cell.text(rlbound + i - 1);
            } else {
              var currentRowVal = rlbound + i - 1;
              var currentColVal = clbound + j - 1;
              cell.text(currentRowVal * currentColVal);
            }
            row.append(cell);
          }
          table.append(row);
        }
  
        // Append the table to the container
        $('#multiTable').html(table);
      }
    });
  
    // Temporary disable validation on submit button click
    $('#submitButton').click(function() {
      $('#boundsForm').validate().cancelSubmit = true;
      $('#boundsForm').submit();
    });
  });
  
