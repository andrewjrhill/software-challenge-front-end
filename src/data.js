export const createScanData = () => [
    {
        name: 'Scans List',
        elevationMax: 3.0,
        elevationMin: 2.0,
        scannedByUserId: 3,
    },
    {
        name: 'Concrete Slab #1',
        elevationMax: 3.2,
        elevationMin: 0.1,
        scannedByUserId: 0,
    },
    {
        name: 'Concrete Slab #2',
        elevationMax: 3.3,
        elevationMin: 0.05,
        scannedByUserId: 0,
    },
    {
        name: 'Door opening',
        elevationMax: 2.44,
        elevationMin: 0.1,
        scannedByUserId: 0,
    },
    {
        name: 'Floor',
        elevationMax: 0.2,
        elevationMin: 0.05,
        scannedByUserId: 1, // 'Guido van Rossum',
    },
    {
        name: 'Ceiling',
        elevationMax: 3.4,
        elevationMin: 3.15,
        scannedByUserId: 0,
    },
    {
        name: 'Ventilation Opening',
        elevationMax: 1.6,
        elevationMin: 1.5,
        scannedByUserId: 1, // 'Guido van Rossum',
    },
    {
        name: 'Column #1',
        elevationMax: 0.1,
        elevationMin: 9.2,
        scannedByUserId: 0,
    },
    {
        name: 'Column #2',
        elevationMax: 0.2,
        elevationMin: 9.0,
        scannedByUserId: 0,
    },
    {
        name: 'Column #3',
        elevationMax: 0.1,
        elevationMin: 9.0,
        scannedByUserId: 2,
    },
];

export const createUserData = () => [
    {
        id: 0,
        name: 'Linus Torvalds',
    },
    {
        id: 1,
        name: 'Guido van Rossum',
    },
    {
        id: 2,
        name: 'Rich Hickey',
    },
    {
        id: 3,
        name: 'Andrew Hill',
    }
];
