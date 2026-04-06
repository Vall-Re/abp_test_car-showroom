export async function fetchVehicle() {
  try {
    const response = await fetch('https://dummyjson.com/products/category/vehicle');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return [];
  }
}
export async function fetchVehicleById(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching vehicle by id:', error);
    return null;
  }
}

