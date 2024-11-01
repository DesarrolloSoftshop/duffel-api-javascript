import { Airline, CabinClass, DuffelPassengerType, Place, PlaceType } from '../../types';
import { Offer } from '../Offers/OfferTypes';
export interface OfferRequestSlice {
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date on which the passengers want to depart
     */
    departure_date: string;
    /**
     * The city or airport the passengers want to travel to
     */
    destination: Place | string;
    /**
     * The city or airport the passengers want to depart from
     */
    origin: Place | string;
    /**
     * The type of the origin
     */
    origin_type: PlaceType;
    /**
     * The type of the destination
     */
    destination_type: PlaceType;
}
/**
 * The passengers who want to travel. A passenger will have only a type or an age.
 */
export interface OfferRequestPassenger {
    /**
     * The age of the passenger on the `departure_date` of the final slice.
     */
    age?: number;
    /**
     * The type of the passenger.
     */
    type?: DuffelPassengerType;
    /**
     * The passenger's family name. Only `space`, `-`, `'`, and letters from the `ASCII`, `Latin-1 Supplement` and `Latin
     * Extended-A` (with the exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, , and `ð`) Unicode charts are accepted. All
     * other characters will result in a validation error. The minimum length is 1 character, and the maximum is 20
     * characters.
     *
     * This is only required if you're also including **Loyalty Programme Accounts**.
     */
    family_name?: string;
    /**
     * The passenger's given name. Only `space`, `-`, `'`, and letters from the `ASCII`, `Latin-1 Supplement` and `Latin
     * Extended-A` (with the exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, , and `ð`) Unicode charts are accepted. All
     * other characters will result in a validation error. The minimum length is 1 character, and the maximum is 20
     * characters.
     *
     * This is only required if you're also including **Loyalty Programme Accounts**.
     */
    given_name?: string;
    /**
     * The **Loyalty Programme Accounts** for this passenger.
     */
    loyalty_programme_accounts?: LoyaltyProgrammeAccount[];
    /**
     * The identifier for the passenger, unique within this Offer Request and across all Offer Requests.
     * This ID will be generated by Duffel unless you had optionally provided one.
     * Optionally providing one has been deprecated.
     */
    id: string;
}
/**
 * The **Loyalty Programme Account** details.
 */
export interface LoyaltyProgrammeAccount {
    /**
     * The passenger's account number for this **Loyalty Programme Account**.
     */
    account_number: string;
    /**
     * The IATA code for the airline that this **Loyalty Programme Account** belongs to.
     */
    airline_iata_code: Airline['iata_code'];
}
/**
 * To search for flights, you'll need to create an offer request.
 * An offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
 * It may also include additional filters (e.g. a particular cabin to travel in).
 * @link https://duffel.com/docs/api/offer-requests/schema
 */
export interface OfferRequest {
    /**
     * The slices that make up this offer request.
     * One-way journeys can be expressed using one slice, whereas return trips will need two.
     * @link https://duffel.com/docs/api/overview/key-principles
     */
    slices: OfferRequestSlice[];
    /**
     * The cabin that the passengers want to travel in
     */
    cabin_class?: CabinClass;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer request was created
     */
    created_at: string;
    /**
     * Duffel's unique identifier for the offer request
     */
    id: string;
    /**
     * Whether the offer request was created in live mode. This field will be set to true if the offer request was created in live mode, or false if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * The offers returned by the airlines
     */
    offers: Omit<Offer, 'available_services'>[];
    /**
     * The passengers who want to travel. A passenger will have only a type or an age.
     */
    passengers: OfferRequestPassenger[];
}
export interface CreateOfferRequest {
    /**
     * The cabin that the passengers want to travel in
     */
    cabin_class?: CabinClass;
    /**
     * The passengers who want to travel.
     * If you specify an age for a passenger, the type may differ for the same passenger in different offers due to airline's different rules. e.g. one airline may treat a 14 year old as an adult, and another as a young adult.
     */
    passengers: Omit<OfferRequestPassenger, 'id'>[];
    /**
     * The [slices](https://duffel.com/docs/api/overview/key-principles) that make up this offer request.
     * One-way journeys can be expressed using one slice, whereas return trips will need two.
     */
    slices: Omit<OfferRequestSlice, 'origin_type' | 'destination_type'>[];
    /**
     * The maximum number of connections within any slice of the offer.
     * For example 0 means a direct flight which will have a single segment within each slice and 1 means a maximum of two segments within each slice of the offer.
     */
    max_connections?: 0 | 1 | 2;
}
export interface CreateOfferRequestQueryParameters {
    /**
     * When set to `true`, the offer request resource returned will include all the offers returned by the airlines.
     * If set to `false`, the offer request resource won't include any offers.
     * To retrieve the associated `offers` later, use the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint, specifying the `offer_request_id`.
     * You should use this option if you want to take advantage of the pagination, sorting and filtering that the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint provides.
     */
    return_offers?: boolean;
    supplier_timeout?: number;
}