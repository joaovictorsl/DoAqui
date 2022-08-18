import { User } from "firebase/auth";

interface Localization {
  latitude: number,
  longitude: number,
}

export class Item {
  #id: string;
  #title: string;
  #description: string;
  #localization: Localization;
  #tags: string[];
  #imageUrl: string;
  #userEmail: string;
  #createdAt: number;

  constructor(id: string, title: string, description: string, localization: Localization, tags: string[], imageUrl: string, userEmail: string, createdAt: number) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#localization = localization
    this.#tags = tags;
    this.#imageUrl = imageUrl;
    this.#userEmail = userEmail;
    this.#createdAt = createdAt;
  }


  public get id(): string {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  public get description(): string {
    return this.#description;
  }

  public get tags(): string[] {
    return this.#tags;
  }

  public get imageUrl(): string {
    return this.#imageUrl;
  }

  public get userEmail(): string {
    return this.#userEmail;
  }

  public get createdAt(): number {
    return this.#createdAt;
  }

  /**
   * calcDistance calculates the distance between the user and the point of donation of the item.
   */
  public calcDistance(userLongitude: number, userLatitude: number): number {
    let earthRadiusKm = 6371;
    let dLat = this.deg2rad(this.#localization['latitude'] - userLatitude);
    let dLon = this.deg2rad(this.#localization['longitude'] - userLongitude);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(userLatitude)) * Math.cos(this.deg2rad(this.#localization['latitude'])) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distanceInKm = earthRadiusKm * c;
    return distanceInKm;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

}