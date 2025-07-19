// import React, { useState } from "react";
// import { Button, Input, Select, Card, Space, Tooltip } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// const { Option } = Select;

// type FieldType =
//   | "string"
//   | "number"
//   | "float"
//   | "boolean"
//   | "objectId"
//   | "array"
//   | "nested";

// interface Field {
//   key: string;
//   type: FieldType;
//   children?: Field[];
// }

// interface Props {
//   fields: Field[];
//   setFields: (fields: Field[]) => void;
//   isNested?: boolean;
// }

// const FieldEditor: React.FC<Props> = ({
//   fields,
//   setFields,
//   isNested = false,
// }) => {
//   const updateField = (index: number, updatedField: Field) => {
//     const updatedFields = [...fields];
//     updatedFields[index] = updatedField;
//     setFields(updatedFields);
//   };

//   const addField = () => {
//     setFields([...fields, { key: "", type: "string" }]);
//   };

//   const deleteField = (index: number) => {
//     const updatedFields = [...fields];
//     updatedFields.splice(index, 1);
//     setFields(updatedFields);
//   };

//   return (
//     <div style={{ marginLeft: isNested ? 20 : 0 }}>
//       {fields.map((field, index) => (
//         <Card key={index} size="small" style={{ marginBottom: 10 }}>
//           <Space direction="vertical" style={{ width: "100%" }}>
//             <Space wrap>
//               <Input
//                 placeholder="Field Name"
//                 style={{ width: 200 }}
//                 value={field.key}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   updateField(index, { ...field, key: e.target.value })
//                 }
//               />
//               <Select
//                 value={field.type}
//                 style={{ width: 160 }}
//                 onChange={(value: FieldType) => {
//                   const updated = { ...field, type: value };
//                   if (value === "nested" && !field.children) {
//                     updated.children = [];
//                   } else if (value !== "nested") {
//                     delete updated.children;
//                   }
//                   updateField(index, updated);
//                 }}
//               >
//                 <Option value="string">String</Option>
//                 <Option value="number">Number (Int)</Option>
//                 <Option value="float">Float</Option>
//                 <Option value="boolean">Boolean</Option>
//                 <Option value="objectId">ObjectId</Option>
//                 <Option value="array">Array</Option>
//                 <Option value="nested">Nested</Option>
//               </Select>
//               <Tooltip title="Delete field">
//                 <Button
//                   danger
//                   icon={<MinusCircleOutlined />}
//                   onClick={() => deleteField(index)}
//                 />
//               </Tooltip>
//             </Space>

//             {field.type === "nested" && field.children && (
//               <FieldEditor
//                 fields={field.children}
//                 setFields={(updatedChildren) =>
//                   updateField(index, { ...field, children: updatedChildren })
//                 }
//                 isNested
//               />
//             )}
//           </Space>
//         </Card>
//       ))}

//       <Button icon={<PlusOutlined />} onClick={addField}>
//         Add Field
//       </Button>
//     </div>
//   );
// };

// const SchemaBuilder: React.FC = () => {
//   const [fields, setFields] = useState<Field[]>([]);

//   const buildSchema = (fields: Field[]): Record<string, any> => {
//     const schema: Record<string, any> = {};
//     fields.forEach((field) => {
//       if (!field.key.trim()) return; // Skip empty keys

//       switch (field.type) {
//         case "string":
//           schema[field.key] = "example string";
//           break;
//         case "number":
//           schema[field.key] = 123;
//           break;
//         case "float":
//           schema[field.key] = 123.45;
//           break;
//         case "boolean":
//           schema[field.key] = true;
//           break;
//         case "objectId":
//           schema[field.key] = "507f1f77bcf86cd799439011";
//           break;
//         case "array":
//   schema[field.key] = [];
//   break;
//         case "nested":
//           if (field.children) {
//             schema[field.key] = buildSchema(field.children);
//           }
//           break;
//       }
//     });
//     return schema;
//   };

  

//   return (
//     <div style={{ display: "flex", textAlign: "left", padding: 20, gap: 20 }}>
//       <div style={{ flex: 1 }}>
//         <h2>Schema Builder</h2>
//         <FieldEditor fields={fields} setFields={setFields} />
//       </div>
//       <div style={{ flex: 1 }}>
//         <h2>Live JSON Preview</h2>
//         <pre
//           style={{
//             backgroundColor: "#f5f5f5",
//             padding: 10,
//             borderRadius: 4,
//             height: "100%",
//             overflow: "auto",
//           }}
//         >
//           {JSON.stringify(buildSchema(fields), null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default SchemaBuilder;

import React, { useState } from "react";
import { Button, Input, Select, Card, Space, Tooltip, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

type FieldType =
  | "string"
  | "number"
  | "float"
  | "boolean"
  | "objectId"
  | "array"
  | "nested";

interface Field {
  key: string;
  type: FieldType;
  children?: Field[];
}

interface Props {
  fields: Field[];
  setFields: (fields: Field[]) => void;
  isNested?: boolean;
}

const FieldEditor: React.FC<Props> = ({
  fields,
  setFields,
  isNested = false,
}) => {
  const updateField = (index: number, updatedField: Field) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { key: "", type: "string" }]);
  };

  const deleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div style={{ marginLeft: isNested ? 20 : 0 }}>
      {fields.map((field, index) => (
        <Card key={index} size="small" style={{ marginBottom: 10 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space wrap>
              <Input
                placeholder="Field Name"
                style={{ width: 200 }}
                value={field.key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField(index, { ...field, key: e.target.value })
                }
              />
              <Select
                value={field.type}
                style={{ width: 160 }}
                onChange={(value: FieldType) => {
                  const updated = { ...field, type: value };
                  if (value === "nested" && !field.children) {
                    updated.children = [];
                  } else if (value !== "nested") {
                    delete updated.children;
                  }
                  updateField(index, updated);
                }}
              >
                <Option value="string">String</Option>
                <Option value="number">Number (Int)</Option>
                <Option value="float">Float</Option>
                <Option value="boolean">Boolean</Option>
                <Option value="objectId">ObjectId</Option>
                <Option value="array">Array</Option>
                <Option value="nested">Nested</Option>
              </Select>
              <Tooltip title="Delete field">
                <Button
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => deleteField(index)}
                />
              </Tooltip>
            </Space>

            {field.type === "nested" && field.children && (
              <FieldEditor
                fields={field.children}
                setFields={(updatedChildren) =>
                  updateField(index, { ...field, children: updatedChildren })
                }
                isNested
              />
            )}
          </Space>
        </Card>
      ))}

      <Button icon={<PlusOutlined />} onClick={addField}>
        Add Field
      </Button>
    </div>
  );
};

const SchemaBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const buildSchema = (fields: Field[]): Record<string, any> => {
    const schema: Record<string, any> = {};
    fields.forEach((field) => {
      if (!field.key.trim()) return;

      switch (field.type) {
        case "string":
          schema[field.key] = "example string";
          break;
        case "number":
          schema[field.key] = 123;
          break;
        case "float":
          schema[field.key] = 123.45;
          break;
        case "boolean":
          schema[field.key] = true;
          break;
        case "objectId":
          schema[field.key] = "507f1f77bcf86cd799439011";
          break;
        case "array":
          schema[field.key] = [];
          break;
        case "nested":
          if (field.children) {
            schema[field.key] = buildSchema(field.children);
          }
          break;
      }
    });
    return schema;
  };

  const handleDownload = () => {
    const schema = buildSchema(fields);
    const dataStr = JSON.stringify(schema, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: "flex",
        textAlign: "left",
        padding: 20,
        gap: 20,
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          display: "flex",
          gap: 10,
        }}
      >
        <Button type="primary" onClick={handleDownload}>
          Download JSON
        </Button>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>

      <div style={{ flex: 1 }}>
        <h2>Schema Builder</h2>
        <FieldEditor fields={fields} setFields={setFields} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>Live JSON Preview</h2>
        <pre
          style={{
            backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
            padding: 10,
            borderRadius: 4,
            height: "100%",
            overflow: "auto",
            color: darkMode ? "#dcdcdc" : "#000",
          }}
        >
          {JSON.stringify(buildSchema(fields), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SchemaBuilder;
