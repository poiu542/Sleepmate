import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords, insertRecords } from 'react-native-health-connect';
import { Permission } from 'react-native-health-connect/lib/typescript/types';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

const useHealthData = () => {
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [sleepSession, setSleepSession] = useState([]);

    const [androidPermissions, setAndroidPermissions] = useState<Permission[]>([]);
    const hasAndroidPermission = (recordType: string) => {
        return androidPermissions.some((perm) => perm.recordType === recordType);
    };

    
    const insertSampleData = () => {
        insertRecords([
            {
            recordType: 'SleepSession',
            startTime: '2023-09-04T23:30:00.405Z',
            endTime: '2023-09-04T23:40:15.405Z',
            },
        ]).then((ids) => {
            console.log('Records inserted ', { ids });
        });

        insertRecords([
            {
            recordType: 'SleepSession',
            startTime: '2023-09-05T10:30:00.405Z',
            endTime: '2023-09-05T10:40:15.405Z',
            },
        ]).then((ids) => {
            console.log('Records inserted ', { ids });
        });
    };


    useEffect(() => {
        if (Platform.OS !== 'android') {
            return;
        }

        const init = async () => {
            // initialize the client
            const isInitialized = await initialize();
            if (!isInitialized) {
                console.log('Failed to initialize Health Connect');
                return;
            }

            // request permissions
            const grantedPermissions = await requestPermission([
            { accessType: 'write', recordType: 'Steps'},
            { accessType: 'read', recordType: 'Steps' },
            { accessType: 'read', recordType: 'Distance' },
            { accessType: 'write', recordType: 'SleepSession'},
            { accessType: 'read', recordType: 'SleepSession'}
            ]);

            setAndroidPermissions(grantedPermissions);
        };

        init();
    }, []);

    useEffect(() => {

        // insertSampleData();

        if (!hasAndroidPermission('Sleep')) {
            return;
        }

        const getHealthData = async () => {
            const today = new Date();
            const timeRangeFilter: TimeRangeFilter = {
                operator: 'between',
                startTime: new Date(today.getTime() - 86400000).toISOString(),
                endTime: today.toISOString(),
            };

            // Steps
            const steps = await readRecords('Steps', { timeRangeFilter });
            const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
            setSteps(totalSteps);

            // Distance
            const distance = await readRecords('Distance', { timeRangeFilter });
            const totalDistance = distance.reduce(
            (sum, cur) => sum + cur.distance.inMeters,
            0
            );
            setDistance(totalDistance);


            
            // Sleep Data
            const sleepSession = await readRecords('SleepSession', { timeRangeFilter });

            console.log(sleepSession);
            
            // for (let i = 0; i < sleepSession.length; i++) {
            //     console.log("startTime : " + sleepSession[i].startTime);
            //     console.log("endTime : " + sleepSession[i].endTime);
            //     console.log("stage : " + sleepSession[i].stages);
            // }
        };

        getHealthData();
    }, [androidPermissions])

    return { steps, distance, sleepSession };
};

export default useHealthData;