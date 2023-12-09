export interface CartItem {
	id: string;
	quantity: number;
	image: string;
	name: string;
	price: number;
}
export interface MessageNoId {
	title: string;
	text: string;
	type: string;
	timeout: number;
}
export interface Message extends MessageNoId {
	id: number;
}
export interface UserData {
	uid: string;
	email: string;
	name: string;
	phoneNumber: string;
	purchases: string[];
	stripeCustomerId: string;
}
