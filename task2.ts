interface Trip {
  pickupPoints: string[];
  dropPoints: string[];
  warehouse: string | null;
}

interface Shipment {
  pickUpPoints: string[];
  dropPoints: string[];
}

function areTripsLegit(trips: Trip[], shipment: Shipment): boolean {
  const pickupPoints = new Set(shipment.pickUpPoints);
  const dropPoints = new Set(shipment.dropPoints);

  for (const trip of trips) {
    const tripPickupPoints = new Set(trip.pickupPoints);
    const tripDropPoints = new Set(trip.dropPoints);

    if (!tripPickupPoints.every((point) => pickupPoints.has(point))) {
      return false;
    }

    if (!tripDropPoints.every((point) => dropPoints.has(point))) {
      return false;
    }

    if (trip.warehouse && !pickupPoints.has(trip.warehouse)) {
      return false;
    }
  }

  return true;
}

// Example usage:
const shipment: Shipment = {
  pickUpPoints: ['A', 'B'],
  dropPoints: ['C', 'D'],
};

const trips: Trip[] = [
  { pickupPoints: ['A', 'W'], dropPoints: ['W', 'C'], warehouse: 'W' },
  { pickupPoints: ['B', 'W'], dropPoints: ['W', 'D'], warehouse: 'W' },
  { pickupPoints: ['W', 'W'], dropPoints: ['W', 'C'], warehouse: 'W' },
  { pickupPoints: ['W', 'W'], dropPoints: ['W', 'D'], warehouse: 'W' },
];

console.log(areTripsLegit(trips, shipment)); // Output: true
