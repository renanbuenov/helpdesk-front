export interface Ticket {
    id?:               any;
    dateOpened?:    string;
    dateClosed?:    string;
    priority:       string;
	status:         string;
	title:          string;
	observation:    string;
    technician:        any;
    client:            any;
    nameClient:     string;
    nameTechnician: string;
}