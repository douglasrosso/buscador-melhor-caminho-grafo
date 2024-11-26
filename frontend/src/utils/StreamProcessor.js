export class StreamProcessor {
  process(response) {
    return {
      then: async function (callback) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let result = [];
        let done = false;
        let buffer = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;

          if (value) {
            buffer += decoder.decode(value, { stream: true });
            let boundary = buffer.lastIndexOf("\n");

            if (boundary !== -1) {
              const chunk = buffer.slice(0, boundary);
              buffer = buffer.slice(boundary + 1);

              try {
                const paths = chunk.trim().split("\n").map(JSON.parse);
                result = result.concat(paths.map((p) => p.caminho));
                callback(result);
              } catch (e) {
                console.error("Falha ao converter parte do JSON", e);
              }
            }
          }
        }
      },
    };
  }
}
