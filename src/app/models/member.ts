export interface Member {
  id?: number;
  attributes: {
    typeMember: string;
    email: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    sex: string,
    phone: string;
    country: string;
    city: string;
    studiesLevel: string; // select (BEPC, BAC, BAC+1, BAC+2, BTS, Licence,  BAC+4, Master, Doctorat)
    fieldActivity: string;
    associativeExperience: string;
    cv?: string;
    verified?: string;
    qualities: string;
    howKnowUs: string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
    tiktok: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
}


