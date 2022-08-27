interface MessageInterface {
    ExternalDescription: string,
    Geometry: {
        WGS84: string
    },
    EventId: string,
    Header: string,
    ReasonCode: [
        {
            Code: string,
            Description: string
        }
    ],
    TrafficImpact: [
        {
            IsConfirmed: boolean,
            FromLocation: [],
            AffectedLocation: [],
            ToLocation: []
        },
        {
            IsConfirmed: boolean,
            FromLocation: [],
            AffectedLocation: []
        }
    ],
    StartDateTime: string,
    LastUpdateDateTime: string
}

export default MessageInterface;