// test-hash.ts
import * as bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'admin123';
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Hash generado:', hash);
}

generateHash();