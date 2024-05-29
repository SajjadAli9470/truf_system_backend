// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Create an Express application
const app = express();

// Parse JSON bodies
app.use(express.json());

// Set up Multer storage and upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // Rename files to avoid conflicts
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// Set up static file serving to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'asahtech_trf' // Your database name
});

// Route to handle POST requests to insert data into the signup table
app.post('/registration_user', (req, res) => {
  // Extract data from the request body
  const { name, phone_number, CNIC, email, password, role } = req.body;

  // Check if the email already exists
  pool.query('SELECT COUNT(*) AS count FROM signup WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error checking email existence:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const emailExists = results[0].count > 0;
      if (emailExists) {
        return res.status(400).json({ error: 'Account with This Email/Cnic already exist. Use Another' });
      }

      // Perform the database query to insert data into the signup table
      pool.query('INSERT INTO signup (name, phone_number, CNIC, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone_number, CNIC, email, password, role],
        (error, results, fields) => {
          if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(201).json({ message: 'Account Registered Successfully' });
        });
    });
});


//----------------------------------------------------------------------------
// Route to handle login requests
app.post('/login_user', (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Perform the database query to check if the email and password match
  pool.query('SELECT email, password, phone_number, role, CNIC FROM signup WHERE email = ? AND password = ?',
    [email, password],
    (error, results, fields) => {
      
      if (error) {
        console.error('Error checking login credentials:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Check if any rows were returned
      if (results.length === 0) {
        // No matching user found
        console.log(fields);
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // User found, send response with email, password, and role
      const { email, password,phone_number, role, CNIC } = results[0];
      res.status(200).json({ email, password,phone_number, role, CNIC, message: 'Login successful' });
    });
});

//----------------------------------------------------------------------------
// Route to fetch user data based on role
app.get('/all_users_profiles', (req, res) => {
  // Perform the database query to fetch all data from signup table where role is user
  pool.query('SELECT * FROM signup WHERE role = "user"', (error, results, fields) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the results as JSON response
    res.status(200).json(results);
  });
});

//----------------------------------------------------------------------------
// Route to fetch user data based on role
app.get('/all_ground_owners_profiles', (req, res) => {
  // Perform the database query to fetch all data from signup table where role is user
  pool.query('SELECT * FROM signup WHERE role = "ground owner"', (error, results, fields) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the results as JSON response
    res.status(200).json(results);
  });
});

//----------------------------------------------------------------------------
// Route to fetch user data based on role
app.get('/all_player_profiles', (req, res) => {
  // Perform the database query to fetch all data from signup table where role is user
  pool.query('SELECT * FROM signup WHERE role = "player"', (error, results, fields) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the results as JSON response
    res.status(200).json(results);
  });
});

//----------------------------------------------------------------------------

// Your existing route to handle POST requests to insert data into the player table
// POST endpoint to insert data into the player table
app.post('/new_player', upload.single('player_image'), (req, res) => {
  const { player_name, team_name, CNIC, phone_number, goals, assists, description,position } = req.body;
  const picture_url = req.file ? 'http://192.168.4.105:3000/' + req.file.path.replace(/\\/g, '/') : ''; // Construct picture URL

  // Check if the CNIC already exists in the player table
  const checkCNICQuery = 'SELECT * FROM player WHERE CNIC = ?';
  pool.query(checkCNICQuery, [CNIC], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking CNIC:', checkErr);
      res.status(500).json({ error: 'Error checking CNIC' });
      return;
    }
    if (checkResult.length > 0) {
      // CNIC already exists in the player table
      console.log('Your profile is already Uploaded');
      res.status(409).json({ error: 'Your profile is already Uploaded' });
      return;
    }

    // CNIC does not exist, proceed to insert data into the player table
    const insertQuery = 'INSERT INTO player (player_name, team_name, CNIC, phone_number, goals, assists, description, picture_url,position) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
    const values = [player_name, team_name, CNIC, phone_number, goals, assists, description, picture_url,position];

    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Inavlid Cnic, Use same Cnic you used while registering:', err);
        res.status(500).json({ error: 'Inavlid Cnic, Use same Cnic you used while registering' });
        return;
      }
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
});


//----------------------------------------------------------------------------
// GET endpoint to fetch all records from the player table
app.get('/players_records', (req, res) => {
  const selectQuery = 'SELECT * FROM player';
  pool.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    console.log('Records fetched successfully');
    res.status(200).json(result);
  });
});

//----------------------------------------------------------------------------
// POST endpoint to insert data into the ground_detail table
app.post('/add_ground', upload.single('ground_image'), (req, res) => {
  const { ground_name, ground_description, price_per_hour, location, ground_status, CNIC,lng,lat } = req.body;
  const image_url = req.file ? 'http://192.168.4.113:3000/' + req.file.path.replace(/\\/g, '/') : ''; // Construct image URL

  // Check if the CNIC exists in the signup table
  const checkCNICQuery = 'SELECT * FROM signup WHERE CNIC = ?';
  pool.query(checkCNICQuery, [CNIC], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking CNIC:', checkErr);
      res.status(500).json({ error: 'Error checking CNIC' });
      return;
    }
    if (checkResult.length === 0) {
      // CNIC does not exist in the signup table
      res.status(400).json({ error: 'Inavlid Cnic, Use same Cnic you used while registering' });
      return;
    }

    // CNIC exists, proceed to check if ground data already exists
    const checkGroundQuery = 'SELECT * FROM ground_detail WHERE ground_name = ?'; // Assuming ground_name is unique
    pool.query(checkGroundQuery, [ground_name], (checkGroundErr, checkGroundResult) => {
      if (checkGroundErr) {
        console.error('Error checking ground data:', checkGroundErr);
        res.status(500).json({ error: 'Error checking ground data' });
        return;
      }
      if (checkGroundResult.length > 0) {
        // Ground data already exists
        res.status(409).json({ error: 'Ground with this name already exists' });
        return;
      }

      // Ground data does not exist, proceed to insert into the ground_detail table
      const insertQuery = 'INSERT INTO ground_detail (ground_name, ground_description, price_per_hour, location, image_data, ground_status, CNIC,lng,lat) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
      const values = [ground_name, ground_description, price_per_hour, location, image_url, ground_status, CNIC,lng,lat];

      pool.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Error inserting data' });
          return;
        }
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
      });
    });
  });
});

//----------------------------------------------------------------------------
// GET endpoint to fetch ground details
app.get('/fetch_grounds_details', (req, res) => {
  // Query to fetch ground details from the database
  const selectQuery = 'SELECT * FROM ground_detail';

  // Execute the SELECT query
  pool.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching ground details:', err);
      res.status(500).json({ error: 'Error fetching ground details' });
      return;
    }

    // Return the fetched ground details as JSON response
    res.status(200).json(results);
  });
});

//----------------------------------------------------------------------------
// POST endpoint for inserting ground booking
app.post('/post_ground_booking', (req, res) => {
  const { ground_name, booking_date, booking_slots, name, CNIC, phone_number } = req.body;

  // Check if booking_slots field is provided and is a string
  if (!booking_slots || typeof booking_slots !== 'string') {
    return res.status(400).json({ error: 'Invalid booking slots format' });
  }

  // Prepare and execute the insertion query for each booking slot
  const slots = booking_slots.split(',');
  const insertPromises = slots.map(slot => {
    const trimmedSlot = slot.trim();
    return new Promise((resolve, reject) => {
      const checkSlotQuery = 'SELECT COUNT(*) AS slotCount FROM ground_booking WHERE booking_date = ? AND booking_slot = ? AND ground_name = ?';
      pool.query(checkSlotQuery, [booking_date, trimmedSlot, ground_name], (checkErr, checkResult) => {
        if (checkErr) {
          console.error('Error checking slot:', checkErr);
          reject(checkErr);
          return;
        }
        if (checkResult[0].slotCount > 0) {
          console.log('Slot already booked:', trimmedSlot);
          resolve({ slot: trimmedSlot, status: 'already_booked' }); // Return slot as already booked in response
          return;
        }
        // If slot is available, proceed with insertion
        const insertQuery = `
          INSERT INTO ground_booking (ground_name, booking_date, booking_slot, name, CNIC, phone_number, total_price)
          SELECT ground_name, ?, ?, ?, ?, ?, (SELECT price_per_hour * ? FROM ground_detail WHERE ground_name = ?) AS total_price
          FROM ground_detail
          WHERE ground_name = ?`;
        const numberOfSlots = slots.length;
        pool.query(insertQuery, [booking_date, trimmedSlot, name, CNIC, phone_number, numberOfSlots, ground_name, ground_name], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error inserting booking:', insertErr);
            reject(insertErr);
            return;
          }
          resolve(null); // Resolve with null after successful insertion
        });
      });
    });
  });

  // Check if any slots are already booked
  Promise.all(insertPromises)
    .then(results => {
      const alreadyBookedSlots = results.filter(result => result !== null);
      if (alreadyBookedSlots.length > 0) {
        // At least one slot is already booked, return only those slots in the response
        res.status(400).json({ error: 'One or more slots are already booked', slots: alreadyBookedSlots });
        return;
      }

      // No slots are already booked, all slots have been successfully inserted
      res.status(200).json({ message: 'Ground booked Successfully' });
    })
    .catch(error => {
      console.error('Error checking/inserting slots:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

//----------------------------------------------------------------------------
// GET endpoint to retrieve ground booking data
app.get('/get_ground_booking', (req, res) => {
  // Query to fetch ground booking data from the database
  const query = 'SELECT * FROM ground_booking';

  // Execute the query
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching ground booking data:', err);
      res.status(500).json({ error: 'Error fetching ground booking data' });
      return;
    }
    
    // If there are no errors, return the fetched data
    res.status(200).json(results);
  });
});

//----------------------------------------------------------------------------
// POST endpoint to fetch ground details by CNIC
app.post('/fetch_grounds_by_cnic', (req, res) => {
  const { CNIC } = req.body;

  // Check if CNIC exists in signup table
  const cnicQuery = 'SELECT COUNT(*) AS cnicCount FROM signup WHERE CNIC = ?';
  pool.query(cnicQuery, [CNIC], (cnicErr, cnicResult) => {
    if (cnicErr) {
      console.error('Error checking CNIC:', cnicErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (cnicResult[0].cnicCount === 0) {
      res.status(400).json({ error: 'CNIC not found in signup table' });
      return;
    }

    // Fetch ground details for the provided CNIC
    const fetchGroundsQuery = 'SELECT * FROM ground_detail WHERE CNIC = ?';
    pool.query(fetchGroundsQuery, [CNIC], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error('Error fetching ground details:', fetchErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (fetchResult.length === 0) {
        res.status(404).json({ error: 'No ground details found for the provided CNIC' });
        return;
      }

      // Ground details found, send them in the response
      res.status(200).json({ grounds: fetchResult });
    });
  });
});

//----------------------------------------------------------------------------
// POST endpoint to fetch ground details by CNIC
app.post('/fetch_booking_by_cnic', (req, res) => {
  const { CNIC } = req.body;

  // Check if CNIC exists in signup table
  const cnicQuery = 'SELECT COUNT(*) AS cnicCount FROM signup WHERE CNIC = ?';
  pool.query(cnicQuery, [CNIC], (cnicErr, cnicResult) => {
    if (cnicErr) {
      console.error('Error checking CNIC:', cnicErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (cnicResult[0].cnicCount === 0) {
      res.status(400).json({ error: 'CNIC not found in signup table' });
      return;
    }

    // Fetch ground details for the provided CNIC
    const fetchGroundsQuery = 'SELECT * FROM ground_booking WHERE CNIC = ?';
    pool.query(fetchGroundsQuery, [CNIC], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error('Error fetching booked slots details:', fetchErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (fetchResult.length === 0) {
        res.status(404).json({ error: 'No booked slots details found for the provided CNIC' });
        return;
      }

      // Ground details found, send them in the response
      res.status(200).json({ grounds: fetchResult });
    });
  });
});

//----------------------------------------------------------------------------
// POST endpoint to fetch ground details by CNIC
app.post('/fetch_player_by_cnic', (req, res) => {
  const { CNIC } = req.body;

  // Check if CNIC exists in signup table
  const cnicQuery = 'SELECT COUNT(*) AS cnicCount FROM signup WHERE CNIC = ?';
  pool.query(cnicQuery, [CNIC], (cnicErr, cnicResult) => {
    if (cnicErr) {
      console.error('Error checking CNIC:', cnicErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (cnicResult[0].cnicCount === 0) {
      res.status(400).json({ error: 'CNIC not found in signup table' });
      return;
    }

    // Fetch ground details for the provided CNIC
    const fetchGroundsQuery = 'SELECT * FROM player WHERE CNIC = ?';
    pool.query(fetchGroundsQuery, [CNIC], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error('Error fetching player details:', fetchErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (fetchResult.length === 0) {
        res.status(404).json({ error: 'No player details found for the provided CNIC' });
        return;
      }

      // Ground details found, send them in the response
      res.status(200).json({ grounds: fetchResult });
    });
  });
});

// POST endpoint to fetch ground bookings by ground name
app.post('/fetch_bookings_by_ground_name', (req, res) => {
  const { ground_name } = req.body;

  // Perform the database query to fetch bookings for the provided ground name
  const query = 'SELECT * FROM ground_booking WHERE ground_name = ?';

  pool.query(query, [ground_name], (error, results) => {
    if (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Error fetching bookings' });
    }

    // If there are no errors, return the fetched bookings
    res.status(200).json(results);
  });
});
// API endpoint to fetch all bookings by ground owner CNIC
app.post('/cnic', (req, res) => {
  const { owner_cnic } = req.body;

  if (!owner_cnic) {
    return res.status(400).json({ error: 'Owner CNIC is required' });
  }

  // Step 1: Get all ground IDs owned by the owner
  pool.query('SELECT ground_id FROM ground_detail WHERE CNIC = ?', [owner_cnic], (err, groundResults) => {
    if (err) {
      console.error('Error fetching ground IDs:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (groundResults.length === 0) {
      return res.status(404).json({ error: 'No grounds found for the given CNIC' });
    }

    const groundIds = groundResults.map(result => result.ground_id);

    // Step 2: Get all bookings for the retrieved ground IDs along with ground details
    const query = `
      SELECT gb.*
      FROM ground_booking gb
      JOIN ground_detail gd WHERE gb.ground_name = gd.ground_name
      
    `;
    pool.query(query, [groundIds], (err, bookingResults) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ bookings: bookingResults });
    });
  });
});
// POST endpoint to fetch ground bookings by ground name
// app.post('/cnic', (req, res) => {
//   const { cnic } = req.body;

//   // Perform the database query to fetch bookings for the provided ground name
//   const query = 'SELECT * FROM ground_booking g,signup s WHERE ';  

//   pool.query(query, [cnic], (error, results) => {
//     if (error) {
//       console.error('Error fetching bookings wrt CNIC:', error);
//       return res.status(500).json({ error: 'Error fetching bookings wrt CNIC' });
//     }
//     // If there are no errors, return the fetched bookings
//     res.status(200).json(results);
//   });
// });




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});