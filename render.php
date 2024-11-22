<?php

namespace MaddenNino\Blocks\FaqAccordion;
use MaddenNino\Library\Constants as Constants;
  
/**
 * Render function for the dynamic example block
 * @param array $attrs        all block attributes
 * @param string $content     
 */

$attrs = $attributes;
$wrapper_attributes = get_block_wrapper_attributes();
// error_log(print_r($attrs,true));

// Gap
$faq_gap = wp_style_engine_get_styles(array(
	'spacing' => array(
		'margin' => $attrs['faqGap']
	)
));
$faq_gap = $faq_gap['declarations']['margin-top'];
$faq_gap = 'gap:' . $faq_gap;

// Padding
$faq_padding = wp_style_engine_get_styles(array(
	'spacing' => array(
		'padding' => $attrs['faqPadding']
	)
));
$faq_padding = $faq_padding['css'];

$anchor = $attrs['anchor'] ? "id=". $attrs['anchor'] : null;
$schema =  $attrs['outputSchema'] ? true : false;

$faq_class = array(
	isset($attrs['faqBgColor']['name']) ? 'has-' . $attrs['faqBgColor']['name'] . '-background-color' : null,
	isset($attrs['faqColor']['name']) ? 'has-' . $attrs['faqColor']['name'] . '-color' : null,
	isset($attrs['activeFaqBgColor']['name']) ? 'active-' . $attrs['activeFaqBgColor']['name'] . '-background-color' : null,
	isset($attrs['activeFaqColor']['name']) ? 'active-' . $attrs['activeFaqColor']['name'] . '-color' : null,
	isset($attrs['hoverFaqBgColor']['name']) ? 'hover-' . $attrs['hoverFaqBgColor']['name'] . '-background-color' : null,
	isset($attrs['hoverFaqColor']['name']) ? 'hover-' . $attrs['hoverFaqColor']['name'] . '-color' : null
);

// Filter out null values and join classes with spaces
$faq_class = trim(implode(' ', array_filter($faq_class)));
?>

<!-- NEED gap on section -->
<section <?php echo $anchor; ?> <?php echo $wrapper_attributes; ?> data-schema="<?php echo $schema; ?>" style="<?php echo $faq_gap;?>">

	<?php
	foreach($attrs['qa'] as $index => $qa) { 

	$uid = $attrs['cId'].'-'.$index;
	$status = ($index === 0 && $attrs['openFirstItem']) ? 'open' : 'closed';
	?>
	<div class="faq-wrapper" data-uid="<?php echo $uid; ?>" data-status="<?php echo $status; ?>">

		<div class="faq-question <?php echo $faq_class;?>" style="<?php echo $faq_padding;?>">
			<span><?php echo $qa['question']; ?></span>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
				<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>
		</div>

		<div class="faq-answer">
			<div class="inner-content">
				<p><?php echo $qa['answer']; ?></p>
			</div>
		</div>

	</div>
	<?php } ?>
</section>