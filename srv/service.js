module.exports = async (srv) => {
    const { Tasks } = cds.entities("my.schema");
  
    // Validação antes de criar uma Task
    srv.before("CREATE", "Tasks", (req) => {
      if (!req.data.title) {
        req.error(400, "O título é obrigatório!");
      }
    });
  
    // Validação antes de atualizar uma Task
    srv.before("UPDATE", "Tasks", async (req) => {
      const tx = cds.transaction(req);
      const taskID = req.data.ID; // Obtém o ID da Task que está sendo atualizada
      if (req.data.done) {
        if (!taskID) {
          req.error(400, "O ID da Task é obrigatório para atualização!");
          return;
        }
        const taskExists = await tx.run(
          SELECT.one.from(Tasks).where({ ID: taskID })
        );
  
        if (!taskExists) {
          req.error(404, `A Task com ID ${taskID} não foi encontrada!`);
        }
  
        // Atualiza o campo 'done' para true
        await tx.run(
          UPDATE(Tasks)
            .set({ done: true, dhDone: new Date().toLocaleString() })
            .where({ ID: taskID })
        );
      } else {
        await tx.run(
          UPDATE(Tasks).set({ done: false, dhDone: null }).where({ ID: taskID })
        );
      }
    });
  };
  