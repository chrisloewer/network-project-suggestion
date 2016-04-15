
<?php
$f = fopen("switchList", "w") or die("Unable to open file!");

  // Clear File
  ftruncate($f, 0);

  // Write new content
  $txt = $_GET['data'];
  fwrite($f, $txt);
fclose($f);
?>
