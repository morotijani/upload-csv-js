<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
          margin: 0 auto;
          text-align: center;
          border-collapse: collapse;
          border: 1px solid #d4d4d4;
          height: 500px; 
        }
         
        tr:nth-child(even) {
          background: #d4d4d4;
        }
         
        th, td {
          padding: 10px 30px;
        }
         
        th {
          border-bottom: 1px solid #d4d4d4;
        }
    </style>

</head>
<body>

    <script src="CsvToTable.js"></script>
    <script>
        var csvtotable = new CsvToTable({
            csvFile: 'files/<?= $_GET["f"]; ?>' 
        });
        csvtotable.run();
    </script>
</body>
</html>