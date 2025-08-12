import uuidV4 from "./generate-uuidv4";

type HttpMethod = "GET" | "POST" | "PUT";

interface PixPaymentInfo {
    amount: number
    description: string
    email: string
    name: string
    cpf: string
}

type PixOrderResponse = {
    id: number
    status: string
    point_of_interaction: {
        transaction_data: {
            qr_code: string
            ticket_url: string
            qr_code_base64: string
        }
    },
    transaction_amount: number
}

interface ErrorResponse {
  message: string,
  error: string,
  status: number,
}

export default class MercadoPagoAPI {
    BASE_URL = "https://api.mercadopago.com";
    apiToken: string;
    
    constructor(apiToken: string){
        this.apiToken = apiToken;
    }

    private async request<T>(method: HttpMethod, path: string, body?: any): Promise<T> {
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                // 'x-Signature': "true",
                // 'x-enforce-signature': "false",
                "Authorization": `Bearer ${this.apiToken}`,
                'X-Idempotency-Key': uuidV4()
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(`${this.BASE_URL}${path}`, options);
        if(!response.ok){
            const result: ErrorResponse = await response.json()
            throw new Error(`REQUEST ERROR! STATUS: ${result.status} MESSAGE: ${result.message}`)
        }

        return response.json() as Promise<T>;
    }

    async createPixOrder(paymentInfo: PixPaymentInfo) {
        const path = "/v1/payments";
        const names = paymentInfo.name.split(' ');
        const orderBody = {
            transaction_amount: paymentInfo.amount,
            description: paymentInfo.description,
            payment_method_id: 'pix',
            payer: {
                email: paymentInfo.email,
                first_name: names[0],
                last_name: names[names.length - 1],
                identification: {
                    type: 'CPF',
                    number: paymentInfo.cpf
                }
            }
        };

        return await this.request<PixOrderResponse>("POST", path, orderBody);
    }

    async checkPaymentStatus(id: number){
        const path = `/v1/payments/${id}`;
        return await this.request<PixOrderResponse>("GET", path)
    }

    async simulatePayment(id: number){
        const path = `/v1/payments/${id}`;
        const body = {
            status: "approved"
        };
        return await this.request("PUT", path, body);
    }
}

// curl -X POST \
//     'https://api.mercadopago.com/v1/payments'\
//     -H 'Content-Type: application/json' \
//        -H 'X-Idempotency-Key: 0d5020ed-1af6-469c-ae06-c3bec19954bb' \
//        -H 'Authorization: Bearer TEST-833********75210-08********07c0ee22********c050cd87********7942709' \
//     -d '{
//   "additional_info": {
//     "items": [
//       {
//         "id": "MLB2907679857",
//         "title": "Point Mini",
//         "description": "Point product for card payments via Bluetooth.",
//         "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
//         "category_id": "electronics",
//         "quantity": 1,
//         "unit_price": 58,
//         "type": "electronics",
//         "event_date": "2023-12-31T09:37:52.000-04:00",
//         "warranty": false,
//         "category_descriptor": {
//           "passenger": {},
//           "route": {}
//         }
//       }
//     ],
//     "payer": {
//       "first_name": "Test",
//       "last_name": "Test",
//       "phone": {
//         "area_code": 11,
//         "number": "987654321"
//       },
//       "address": {
//         "zip_code": "12312-123",
//         "street_name": "Av das Nacoes Unidas",
//         "street_number": 3003,
//         "neighborhood": null,
//         "city": 3003,
//         "federal_unit": 3003
//       }
//     },
//     "shipments": {
//       "receiver_address": {
//         "zip_code": "12312-123",
//         "state_name": "Rio de Janeiro",
//         "city_name": "Buzios",
//         "street_name": "Av das Nacoes Unidas",
//         "street_number": 3003
//       },
//       "width": null,
//       "height": null
//     }
//   },
//   "application_fee": null,
//   "binary_mode": false,
//   "campaign_id": null,
//   "capture": false,
//   "coupon_amount": null,
//   "description": "Payment for product",
//   "differential_pricing_id": null,
//   "external_reference": "MP0001",
//   "installments": 1,
//   "metadata": null,
//   "payer": {
//     "entity_type": "individual",
//     "type": "customer",
//     "id": null,
//     "email": "test_user_123@testuser.com",
//     "identification": {
//       "type": "CPF",
//       "number": "95749019047"
//     }
//   },
//   "payment_method_id": "Pix",
//   "token": "ff8080814c11e237014c1ff593b57b4d",
//   "transaction_amount": 58
// }'

// {
//   "created_date": "2021-01-01T00:00:00.000Z",
//   "external_reference": "123456",
//   "id": "0d5020ed",
//   "last_updated_date": "2021-01-01T00:00:00.000Z",
//   "point_of_interaction": {
//     "type": "{\"type\":\"PSP_TRANSFER\"}"
//   },
//   "seller_configuration": {
//     "notification_info": {
//       "notification_url": "http://example.com.br/notification"
//     }
//   },
//   "status": "approved",
//   "transaction": {
//     "from": {
//       "accounts": [
//         {
//           "amount": "100,00"
//         }
//       ]
//     },
//     "paid_amount": 100,
//     "payer": {
//       "id": 123456543
//     },
//     "refunded_amount": 1,
//     "to": {
//       "accounts": [
//         {
//           "amount": "100,00",
//           "origin_id": "01AAAM001A1AY43FBR8WCM9CES",
//           "status_details": [
//             {}
//           ],
//           "owner": {
//             "identification": {
//               "number": "1234567890",
//               "type": "CPF"
//             }
//           }
//         }
//       ]
//     },
//     "total_amount": 100,
//     "statement_descriptor": "test"
//   }
// }