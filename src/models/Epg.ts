export class Epg{
    cache: EpgCache;
    paths: string[] = []; 
}

export class EpgCache{
    enabled: ​​​boolean = true;
    lifespan: number = 10;
    path: string = '';
}