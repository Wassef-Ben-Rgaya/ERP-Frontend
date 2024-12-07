export interface LoginDto {
    matricule: number;
    mdp: string;
  }
  
  export interface RegisterDto {
    nom: string;
    prenom: string;
    Datenaissance: Date;
    adresse: string;
    email: string;
    mdp: string;
    poste: string;
    dateEmbauche: Date;
    statutFamiliale: string;
    typeContrat: string;
    numeroTelephone: number;
    departementId: number;
    matricule: number;
  }
  
  export interface AuthenticationDto {
    token: string;
    expiration: Date;
    refreshToken: string;
  }
  
  export interface RefreshTokenRequestDto {
    token: string;
    refreshToken: string;
  }
  
  export interface PersonnelDto {
    matricule: number;
    nom: string;
    prenom: string;
    Datenaissance: Date;
    adresse: string;
    email: string;
    mdp: string;
    poste: string;
    dateEmbauche: Date;
    statutFamiliale: string;
    typeContrat: string;
    numeroTelephone: number;
    departementId: number;
  
  }
  
  
  export interface AbsenceDto {
    absenceId: number;
    assiduiteId: number;
    date: Date;
    justifiee: boolean;
    totalHeures: number;
  }
  
  export interface AssiduiteDto {
    assiduiteId: number;
    matricule: number;
    totalHeuresPresence: number;
    totalHeuresSupplementaires: number;
    totalHeuresRetard: number;
    totalHeuresAbsence: number;
    totalHeuresPermission: number;
  }
  
  export interface CongeDto {
    congeId: number;
    matricule: number;
    dateDebut: Date;
    dateFin: Date;
    status: string;
  }
  
  export interface DepartementDto {
    departementId: number;
    nom: string;
  }
  
  export interface HoraireDto {
    horaireId: number;
    assiduiteId: number;
    heureDebut: Date;
    heureFin: Date;
    totalHeures: number;
  }
  
  export interface PayeDto {

    payeid: number;
    matricule: number;
    salairebrut: number;
    salairenet: number;
    datepaiement: Date;
    prime: number | null;
    periode: Date;
    nombredejours: number;
    calculatedSalary: any;
  }
  
  
  export interface PermissionDto {
    permissionId: number;
    assiduiteId: number;
    date: Date;
    duree: number;
    status: string;
  }
  
  export interface RetardDto {
    retardId: number;
    assiduiteId: number;
    date: Date;
    duree: number;
    totalHeures: number;
  }
  
  export interface SupplementaireDto {
    supplementaireId: number;
    assiduiteId: number;
    heureDebut: Date;
    heureFin: Date;
    totalHeures: number;
  }
  
  export interface TokenDto {
    tokenId: number;
    matricule: number;
    tokenValue: string;
    expiration: Date;
  }
  