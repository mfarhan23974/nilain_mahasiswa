import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// === SIMPAN DATA ===
const form = document.getElementById("nilaiForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const matakuliah = document.getElementById("matakuliah").value;
    const nilai = parseFloat(document.getElementById("nilai").value);

    try {
      await addDoc(collection(db, "nilaiMahasiswa"), {
        nama,
        nim,
        matakuliah,
        nilai,
      });
      alert("✅ Data berhasil disimpan!");
      form.reset();
    } catch (error) {
      alert("❌ Gagal menyimpan data: " + error.message);
    }
  });
}

// === TAMPILKAN DATA ===
const dataTable = document.getElementById("dataTable");
if (dataTable) {
  async function loadData() {
    const querySnapshot = await getDocs(collection(db, "nilaiMahasiswa"));
    let no = 1;
    dataTable.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      dataTable.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${data.nama}</td>
          <td>${data.nim}</td>
          <td>${data.matakuliah}</td>
          <td>${data.nilai}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editData('${docSnap.id}', '${data.nama}', '${data.nim}', '${data.matakuliah}', '${data.nilai}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="hapusData('${docSnap.id}')">Hapus</button>
          </td>
        </tr>
      `;
    });
  }
  loadData();

  // === HAPUS DATA ===
  window.hapusData = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await deleteDoc(doc(db, "nilaiMahasiswa", id));
      alert("🗑️ Data berhasil dihapus!");
      loadData();
    }
  };

  // === EDIT DATA ===
  window.editData = (id, nama, nim, matakuliah, nilai) => {
    document.getElementById("editId").value = id;
    document.getElementById("editNama").value = nama;
    document.getElementById("editNim").value = nim;
    document.getElementById("editMatakuliah").value = matakuliah;
    document.getElementById("editNilai").value = nilai;
    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
  };

  // === SIMPAN PERUBAHAN ===
  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const nama = document.getElementById("editNama").value;
    const nim = document.getElementById("editNim").value;
    const matakuliah = document.getElementById("editMatakuliah").value;
    const nilai = parseFloat(document.getElementById("editNilai").value);

    try {
      await updateDoc(doc(db, "nilaiMahasiswa", id), {
        nama,
        nim,
        matakuliah,
        nilai,
      });
      alert("✅ Data berhasil diperbarui!");
      const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
      modal.hide();
      loadData();
    } catch (error) {
      alert("❌ Gagal memperbarui data: " + error.message);
    }
  });
}
