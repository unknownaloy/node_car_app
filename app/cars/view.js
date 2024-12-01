const views = {
  form(car) {
    let action = "/cars";
    let make = "";
    let model = "";

    if (car) {
      action = `/cars/${car.id}`;
      make = car.make;
      model = car.model;
    }

    return this._layout(`
      <form method="post" action="${action}">
        <div>
          Make: <input type="text" name="car_make" value="${make}" />
        </div>
        <div>
          Model: <input type="text" name="car_model" value="${model}" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    `);
  },

  _layout(content) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="/assets/css/style.css" />
    </head>
    <body>
        ${content}
    </body>
    </html>`;
  },
};

export const view = (name, data) => views[name](data);
