Template.registerHelper("formatReservationStatus", function(status){
  switch(status){
    case "Pending": {
      return new Spacebars.SafeString(`
        <span class="badge bg-warning">${status}</span>
      `);
      break;
    }
    case "Confirmed": {
      return new Spacebars.SafeString(`
        <span class="badge bg-success">${status}</span>
      `);
      break;
    }
    case "Done": {
      return new Spacebars.SafeString(`
        <span class="badge bg-primary">${status}</span>
      `);
      break;
    }
    case "Cancelled": {
      return new Spacebars.SafeString(`
        <span class="badge bg-danger">${status}</span>
      `);
      break;
    }
    default:{
      return new Spacebars.SafeString(`
        <span class="badge bg-secondary">${status}</span>
      `);
      break;
    }
  }
});

formatReservationStatus = (status) => {
  switch(status){
    case "Pending": {
      return new Spacebars.SafeString(`
        <span class="badge bg-warning">${status}</span>
      `);
      break;
    }
    case "Confirmed": {
      return new Spacebars.SafeString(`
        <span class="badge bg-success">${status}</span>
      `);
      break;
    }
    case "Done": {
      return new Spacebars.SafeString(`
        <span class="badge bg-primary">${status}</span>
      `);
      break;
    }
    case "Cancelled": {
      return new Spacebars.SafeString(`
        <span class="badge bg-danger">${status}</span>
      `);
      break;
    }
    default:{
      return new Spacebars.SafeString(`
        <span class="badge bg-secondary">${status}</span>
      `);
      break;
    }
  }
}
