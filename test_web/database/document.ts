import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess, register } from '../util';
import { Util } from '@cloudbase/database/dist/util';

export function registerDocument(app, collName) {
  const docIDGenerated = Util.generateDocId();
  const db = app.database();

  register('database document: docID test', () => {
    const document = db.collection(collName).doc(docIDGenerated);
    assert(document.id === docIDGenerated);
  });

  register('database document: API - set data in empty document', async () => {
    await new Promise(async resolve => {
      try {
        const _ = db.command;
        const document = db.collection(collName).doc();
        await document.set({
          name: 'jude'
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));

        const res = await db.collection(collName).where({
          name: _.eq('jude')
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && Array.isArray(res.data));
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database document: API - set data in document existed', async () => {
    await new Promise(async resolve => {
      try {
        const documents = await db.collection(collName).limit(1).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));

        const docId = documents.data[0]._id;
        let res = await db.collection(collName).doc(docId).set({
          data: { type: 'set' }
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && res.updated === 1, { res });

        res = await db.collection(collName).doc(docId).set({
          data: { arr: [1, 2, 3], foo: 123 },
          array: [0, 0, 0]
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && res.updated === 1, { res });

        res = await db.collection(collName).doc(docId).update({
          data: { arr: db.command.push([4, 5, 6]), foo: db.command.inc(1) },
          array: db.command.pop()
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && res.updated === 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database document: API - remove document that not exist', async () => {
    await new Promise(async resolve => {
      try {
        const document = db.collection(collName).doc(docIDGenerated);
        const res = await document.remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && !res.deleted, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database document: API - remove document should success', async () => {
    await new Promise(async resolve => {
      try {
        const documents = await db.collection(collName).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));

        const docId = documents.data[0]._id;
        const res = await db.collection(collName).doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(res) && res.deleted === 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}
