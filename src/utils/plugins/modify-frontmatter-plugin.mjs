export default function transformFrontmatter() {
  return tree => {
    const createRequiredFields = () =>
      `author: ""\ntitle: ""\ndate: ${new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
      })}\ntags: ""`;

    if (!tree.children[0]) return;

    if (tree.children[0].type !== ('yaml' || 'toml')) {
      tree.children.unshift({
        type: 'yaml',
        value: createRequiredFields(),
      });
      return;
    }

    if (tree.children[0].value.length === 0) {
      tree.children[0].value = createRequiredFields();
      return;
    }

    const optionalFields = [],
      requiredFields = [];

    tree.children[0].value.split('\n').filter(field => {
      if (/^(author|title|date|tags)\s*.*/i.test(field)) {
        let property = field.split(/:(.*)/);
        let key = property[0].trim().toLowerCase();
        let value = property[1].trim();
        if (!/^["'`].*["'`]$/.test(value)) value = `\"${value}\"`;
        if (key === 'date' && value.length === 0)
          value = new Date().toLocaleString('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
          });
        property = `${key}: ${value}`;
        requiredFields.push(property);
        return;
      }
      optionalFields.push(field);
    });

    const checkRequiredField = field => {
      const regex = new RegExp('^(' + field + ').*');
      if (!requiredFields.some(e => regex.test(e)))
        field === 'date'
          ? requiredFields.push(
            `${field}: ${new Date().toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}`
          )
          : requiredFields.push(`${field}: ""`);
    };

    if (requiredFields.length !== 4) {
      checkRequiredField('author');
      checkRequiredField('title');
      checkRequiredField('date');
      checkRequiredField('tags');
    }

    tree.children[0].value = requiredFields.concat(optionalFields).join('\n');
  };
}
