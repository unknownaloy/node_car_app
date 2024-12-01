import {
  addCar,
  getAll,
  getById,
  getByMake,
  removeCar,
  saveCar,
} from "./model.js";

export async function createCar(req, res) {
  res.render("cars/form");
}

export async function deleteCar(req, res) {
  const id = req.params.id;

  if (!isIdValid(id)) {
    res.send(404);
    return;
  }

  await removeCar(id);
  res.redirect("/cars");
}

export async function editCar(req, res) {
  const id = req.params.id;

  if (!isIdValid(id)) {
    res.send(404);
    return;
  }

  const car = await getById(id);

  if (!car) {
    res.send(404);
    return;
  }

  res.render("cars/form", { car: convertToCarObj(car) });
}

export async function listCars(req, res) {
  const cars = await getAll();
  res.render("cars/list", {
    cars: cars.map(convertToCarObj),
    title: "My Cars",
  });
}

export async function showCar(req, res) {
  const id = req.params.id;

  if (isIdValid(id)) {
    const car = await getById(id);
    if (!car) {
      res.send(404);
    } else {
      res.render("cars/show", {
        car: convertToCarObj(car),
        title: `Car: ${car.make} ${car.model}`,
      });
    }
  } else {
    const found = await getByMake(req.params.id);

    if (found.length === 0) {
      res.send(404);
    } else {
      res.render("cars/list", {
        cars: found.map(convertToCarObj),
        title: `Cars Made by ${found[0].make}`,
      });
    }
  }
}

export async function storeCar(req, res) {
  const { car_make, car_model } = req.body;

  if (car_make && car_model) {
    await addCar(car_make, car_model);
    res.redirect("/cars");
  } else {
    res.redirect("/cars/create");
  }
}

export async function updateCar(req, res) {
  const id = req.params.id;

  if (!isIdValid(id)) {
    res.send(404);
    return;
  }

  const { car_make, car_model } = req.body;

  if (car_make && car_model) {
    await saveCar(id, car_make, car_model);
    res.redirect(`/cars/${id}`);
  } else {
    res.redirect(`/cars/${id}/edit`);
  }
}

const convertToCarObj = (car) => ({
  id: car._id,
  make: car.make,
  model: car.model,
});

const isIdValid = (id) => id.length === 24;
