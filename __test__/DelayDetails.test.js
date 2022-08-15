import { render } from '@testing-library/react-native';
import DelayDetails from '../components/delay/DelayDetails';

const stationInfo = {
    Cst: {name: 'Stockholm Central'},
    G: {name: 'Göteborg'}
}
const delay = {
    "ActivityId": "1500adde-005d-5397-08da-7c2e063abb48",
    "ActivityType": "Avgang",
    "AdvertisedTimeAtLocation": "2022-08-15T09:48:00.000+02:00",
    "AdvertisedTrainIdent": "12027",
    "Canceled": true,
    "EstimatedTimeAtLocation": "2022-08-15T10:10:00.000+02:00",
    "FromLocation": [
        {
            "LocationName": "Cst",
            "Priority": 1,
            "Order": 0
        }
    ],
    "ToLocation": [
        {
            "LocationName": "G",
            "Priority": 1,
            "Order": 0
        }
    ]
}

test('DelayDetails should show text Inställd if data.Canceled is true', async () => {
    const { getByText } = render(<DelayDetails
        route={{params: {delay: delay}}}
        stationInfo={stationInfo}
        />);
    const canceldText = await getByText('Inställd');

    expect(canceldText).toBeDefined();
});

test('DelayDetails should show time of departure in format hh:mm', async () => {
    const { getByText } = render(<DelayDetails
        route={{params: {delay: delay}}}
        stationInfo={stationInfo}
        />);
    const timeText = await getByText('Planerad avgångstid: 09:48');

    expect(timeText).toBeDefined();
});