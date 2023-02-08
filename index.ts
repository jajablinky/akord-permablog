import { Akord } from "@akord/akord-js";
import * as dotenv from "dotenv";

dotenv.config();
// assign email and password from .env file
const email = process.env.AKORD_EMAIL;
const password = process.env.AKORD_PASSWORD;

// post content to the vault
const title = "Hello world!";
const body = "# Welcome to my Permablog! \nThis is how it starts.";

// access your Akord wallet
const signInAndCreateVault = async (
  email: string | undefined,
  password: string | undefined
) => {
  if (email && password) {
    const { akord } = await Akord.auth.signIn(email, password);
    // create a vault for blog posts
    const { vaultId } = await akord.vault.create("my first vault");
    console.log(`Vault created with Vault ID: ${vaultId}`);
    // create a folder for blog posts
    const { folderId } = await akord.folder.create(vaultId, "posts");
    console.log(`Folder created with Folder ID: ${folderId}`);
    // create post using vault id and folder id
    const { noteId } = await akord.note.create(vaultId, body, title, folderId);
    // get a list of notes in the vault
    const notes = await akord.note.list(vaultId);

    // download each note from the vault
    notes.forEach(async (note) => {
      const { data } = await akord.note.getVersion(note.id);
      console.log(data);
    });
  }
};

signInAndCreateVault(email, password);

// create the vaults
