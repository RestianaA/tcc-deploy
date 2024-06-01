document.addEventListener('DOMContentLoaded', () => {
    const fetchPengaduanButton = document.getElementById('fetchPengaduan');
    const pengaduanList = document.getElementById('pengaduanList');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const responseMessage = document.getElementById('responseMessage');

    fetchPengaduanButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/service2/pengaduan');
            if (response.ok) {
                const pengaduan = await response.json();
                pengaduanList.innerHTML = pengaduan.map(p => `
                    <div>
                        <h3>ID: ${p.id}</h3>
                        <p>Judul: ${p.judul}</p>
                        <p>Isi: ${p.isi}</p>
                        <p>Respon: ${p.respon}</p>
                        <p>Status: ${p.status}</p>
                    </div>
                `).join('');
            } else {
                pengaduanList.textContent = 'Gagal mengambil data pengaduan.';
            }
        } catch (error) {
            pengaduanList.textContent = `Error: ${error.message}`;
        }
    });

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('updateId').value;
        const respon = document.getElementById('respon').value;
        const status = document.getElementById('status').value;

        try {
            const response = await fetch(`http://localhost:5000/service2/pengaduan/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ respon, status }),
            });

            if (response.ok) {
                responseMessage.textContent = 'Pengaduan berhasil diupdate!';
                updateForm.reset();
                fetchPengaduanButton.click();
            } else {
                responseMessage.textContent = 'Gagal mengupdate pengaduan.';
            }
        } catch (error) {
            responseMessage.textContent = `Error: ${error.message}`;
        }
    });

    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('deleteId').value;

        try {
            const response = await fetch(`http://localhost:5000/service2/pengaduan/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                responseMessage.textContent = 'Pengaduan berhasil dihapus!';
                deleteForm.reset();
                fetchPengaduanButton.click();
            } else {
                responseMessage.textContent = 'Gagal menghapus pengaduan.';
            }
        } catch (error) {
            responseMessage.textContent = `Error: ${error.message}`;
        }
    });
});
