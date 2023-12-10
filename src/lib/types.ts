export interface CartItem {
	id: string;
	image: string;
	image_small: string;
	title: string;
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
