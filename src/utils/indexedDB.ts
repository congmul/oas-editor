export default class IndexedDB {
    dbName:string;
    objectStoreName:string;
    storeId: string;
    request:any;
    constructor(dbName:string, objectStoreName:string, storeId:string) {
        this.dbName = dbName;
        this.objectStoreName = objectStoreName;
        this.storeId = storeId;

        // Open DB
        this.request = indexedDB.open(dbName, 1);
        // Create ObjectStore
        this.request.onupgradeneeded = () => {
            const db = this.request.result;
            if (!db.objectStoreNames.contains(this.objectStoreName)) {
              db.createObjectStore(this.objectStoreName, { keyPath: 'id' });
            }
        };
        this.request.onerror = (event:any) => {
            console.log(`Error opening IndexedDB: ${event}`);
        };
    }    

    saveContentToDB(value: Record<string, any>) {
        return new Promise((resolve) => {
            const db = this.request.result;
            const transaction = db.transaction([this.objectStoreName], 'readwrite');
            const store = transaction.objectStore(this.objectStoreName);
            store.put({ id: this.storeId, value });
    
            transaction.oncomplete = () => {
                resolve('Content saved to IndexedDB');
            };
        });
    }

    loadContentFromDB() {
        return new Promise((resolve, reject) => {
            this.request.onsuccess = () => {
                const db = this.request.result;
                const transaction = db.transaction([this.objectStoreName], 'readonly');
                const store = transaction.objectStore(this.objectStoreName);
                const getRequest = store.get('content');            
                getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resolve(getRequest.result.value);
                }else{
                    resolve(undefined)
                }
                };
        
                getRequest.onerror = (event:any) => {
                console.error('Error getting content from IndexedDB:', event);
                reject({status:"error", message: `'Error getting content from IndexedDB: ${event}` });
                };
            };
      
          this.request.onerror = (event:any) => {
            console.error('Error opening IndexedDB:', event);
            reject({status:"error", message: `Error opening IndexedDB: ${event}` });
          };
        })
    }
}