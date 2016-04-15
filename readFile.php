
<?php
  $f = fopen("switchList", "r") or die("Unable to open file!");
    echo fgets($f);
  fclose($f);
?>
