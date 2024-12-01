import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  make_lower: String, // This is because non-relational databases are case sensitive
});

const Car = mongoose.model("Car", carSchema);

export async function addCar(make, model) {
  await Car.create({ make, model, make_lower: make.toLowerCase() });
}

export async function getAll() {
  return await Car.find();
}

export async function getById(id) {
  return await Car.findById(id);
}

export async function getByMake(make) {
  return await Car.find({ make_lower: make.toLowerCase() });
}

export async function removeCar(id) {
  await Car.deleteOne({ _id: id });
}

export async function saveCar(id, make, model) {
  const car = await getById(id);

  if (car) {
    car.make = make;
    car.model = model;
    car.make_lower = make.toLowerCase();

    car.save();
  }
  return Promise.resolve(true);
}
