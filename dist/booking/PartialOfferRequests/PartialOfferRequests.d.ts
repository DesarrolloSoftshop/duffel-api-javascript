import { Client } from 'Client';
import { Resource } from '../../Resource';
import { CreateOfferRequest, DuffelResponse, OfferRequest } from '../../types';
import { SelectedPartialOffersParams } from './PartialOfferRequestTypes';
/**
 * To search for and select flights separately for each slice of the journey, you'll need to create a partial offer request.
 *
 * A partial offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
 * @class
 * @link https://duffel.com/docs/api/partial-offer-requests
 */
export declare class PartialOfferRequests extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(client: Client);
    /**
     * Retrieves a partial offers request by its ID, only including partial offers for the current slice of multi-step search flow.
     * @param {string} id - Duffel's unique identifier for the partial offer request
     * @param {Object} [options] - Selected partial offers
     * @link https:/duffel.com/docs/api/partial-offer-requests/get-partial-offer-request-by-id
     */
    get: (id: string, options?: SelectedPartialOffersParams) => Promise<DuffelResponse<OfferRequest>>;
    /**
     * To search for and select flights separately for each slice of the journey, you'll need to create a partial offer request.
     * A partial offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
     * It may also include additional filters (e.g. a particular cabin to travel in).
     * @param {Object} [options] - the parameters for making a partial offer requests (required: slices, passengers; optional: cabin_class)
     * @link https://duffel.com/docs/api/partial-offer-requests/create-partial-offer-request
     */
    create: <QueryParams>(options: CreateOfferRequest & QueryParams) => Promise<DuffelResponse<OfferRequest>>;
    /**
     * Retrieves an offer request with offers for fares matching selected partial offers..
     * @param {string} id - Duffel's unique identifier for the partial offer request
     * @param {Object} [options] - Selected partial offers
     * @link https:/duffel.com/docs/api/partial-offer-requests/get-partial-offer-request-fares-by-id
     */
    getFaresById: (id: string, options?: SelectedPartialOffersParams) => Promise<DuffelResponse<OfferRequest>>;
}
