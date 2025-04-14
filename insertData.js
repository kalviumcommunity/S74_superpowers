require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('CampusCabDB');

    const sampleData = {
      users: [
        { name: "Amulya B", email: "amulya@example.com", role: "student", createdAt: new Date() }
      ],
      drivers: [
        { name: "Ravi Kumar", cabId: "CAB001", status: "active", location: { lat: 12.9716, lng: 77.5946 } }
      ],
      cabs: [
        { cabId: "CAB001", type: "Electric", capacity: 4, available: true }
      ],
      rides: [
        { userId: "USER123", driverId: "DRIVER456", pickupTime: new Date(), status: "completed" }
      ],
      locations: [
        { locationName: "Main Gate", coordinates: { lat: 12.9718, lng: 77.5937 } }
      ],
      admins: [
        { name: "Kalvium Admin", email: "admin@kalvium.com", permissions: ["view-reports", "edit-users"] }
      ],
      feedbacks: [
        { rideId: "RIDE001", rating: 5, comments: "Great experience!" }
      ],
      notifications: [
        { userId: "USER123", message: "Your cab has arrived!", timestamp: new Date() }
      ],
      payments: [
        { rideId: "RIDE001", amount: 45, paymentMethod: "UPI" }
      ],
      issues: [
        { rideId: "RIDE002", reportedBy: "USER456", issue: "Cab was late", status: "resolved" }
      ]
    };

    for (const [collection, documents] of Object.entries(sampleData)) {
      const result = await db.collection(collection).insertMany(documents);
      console.log(`Inserted ${result.insertedCount} documents into ${collection}`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
